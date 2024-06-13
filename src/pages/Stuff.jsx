import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";


export default function Stuff() {

    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec",
        "Action"
    ]

    const [stuffs, setStuffs] = useState({});


    useEffect(() => {
        axios.get('http://localhost:1111/stuffs', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setStuffs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = { // props
        "name": null,
        "category": null,
        "stuff_stock":
        "total_available",
        "stuff_Stock*": "total_defec",
    }

    const button = [
        "edit",
        "delete",
        "create",
        "trash"
    ]

    const endpoints = {
        "detail": "http://localhost:1111/stuffs/{id}",
        "delete": "http://localhost:1111/stuffs/delete/{id}",
        "update": "http://localhost:1111/stuffs/update/{id}",
        "create": "http://localhost:1111/stuffs/store",
        "trash" : "http://localhost:1111/stuffs/trash"

    }

    const coloumnDetailModalDelete = 'name'

    const judulModalEdit = 'Stuff'

    const inputData = {
        "name": {
            "type": "text",
            "options": null,
        },

        "category": {
            "type": "select",
            "option": ['KLN', 'HTL', 'Sarpras/Teknisi']
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table dataTh={dataThParent}
                    dataTd={stuffs}
                    coloumDB={coloumDataBase}
                    buttonData={button}
                    endpoints={endpoints}
                    coloumnDetail={coloumnDetailModalDelete}
                    judulModalEdit={judulModalEdit}
                    inputData={inputData}
                ></Table>
            </div>
        </>
    )
}