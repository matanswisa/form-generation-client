import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSubmissions } from "../services/api";

export default function SubmissionsTable() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions().then((res) => {
            setSubmissions(res.data);
        });
    }, []);

    const allKeys = Array.from(
        new Set(submissions.flatMap((s) => Object.keys(s.data)))
    );

    return (
        <div>
            <h2>Submitted Forms</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        {allKeys.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        <th>Submitted At</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            {allKeys.map((key) => (
                                <td key={key}>{s.data[key] || "-"}</td>
                            ))}
                            <td>{new Date(s.submitted_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
