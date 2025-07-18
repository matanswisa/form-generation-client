import { useEffect, useState } from "react";
import { fetchSubmissions } from "../services/api";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SubmissionsStack() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions().then((res) => {
            setSubmissions(res);
        });
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Submitted Forms
            </Typography>

            <Stack spacing={2}>
                {submissions?.length && submissions.map((submission) => (
                    <Accordion key={submission.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                Submission #{submission.id}
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Stack spacing={1}>
                                {Object.entries(submission.data).map(([key, value]) => (
                                    <Typography key={key}>
                                        <strong>{key}</strong>: {value?.toString()}
                                    </Typography>
                                ))}
                                <Typography variant="caption" color="text.secondary">
                                    Submitted at:{" "}
                                    {new Date(submission.submitted_at).toLocaleString()}
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    );
}
