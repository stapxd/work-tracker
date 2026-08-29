import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { useAuth } from "../../other/AuthProvider";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

interface Job {
    id: number;
    title: string;
    rate: number;
}

export default function Job() {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !id) return;
        
        const fetchJob = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/jobs/${id}`);

                if(response.status === 404) {
                    setJob(null);
                    navigate('/404');
                }

                const fetchedJob = response?.data.job;
                
                if (fetchedJob) {
                    setJob(fetchedJob);
                }
                else {
                    navigate('/404');
                }
            } catch (err) {
                console.error(err);
                setJob(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchJob();
    }, [user, id]);

    return (
        <Container>
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : job ? (
                <>
                    <h1 className="mt-4">{job.title}</h1>
                    <p>Rate: ${job.rate}</p>
                </>
            ) : (
                <p className="mt-4">Job not found.</p>
            )}
        </Container>
    );

}