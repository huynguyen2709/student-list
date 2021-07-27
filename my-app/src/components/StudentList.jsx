import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const endPoint = `https://qy2o1bl1dd.execute-api.ap-southeast-1.amazonaws.com/test/students`;


function StudentList(props) {
    const [data, setData] = useState([]);

    const [form, setForm] = useState({
        id: '',
        name: '',
    });

    const fetchData = async () => {
        try {
            const { data } = await axios.get(endPoint);
            setData(data.Items);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        setForm({
            id: '',
            name: '',
        });
    }

    const createPost = async () => {
        const { data } = await axios.put(endPoint, form);
        console.log(data);
        fetchData();
    }

    const removePost = async (id) => {
        const { data } = await axios.delete(`${endPoint}/${id}`);
        console.log(data);
        fetchData();
    }

    const editPost = (id, name) => {
        setForm({ id: id, name: name })
        console.log(form);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Id
                <input type='text' value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
                <br />
                Name
                <input type='text' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <br />
                <button>Submit</button>
            </form>

            <h1>Student List</h1>
            <table border='1'>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Delete Button</th>
                        <th>Edit Button</th>
                    </tr>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td><button onClick={() => removePost(item.id)} >Delete</button></td>
                            <td><button onClick={() => editPost(item.id, item.name)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;