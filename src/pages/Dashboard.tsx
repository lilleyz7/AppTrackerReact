import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableRow, TableCell, TableBody } from "../components/ui/table";
import {  Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Application } from "@/types/Application";
import { useNavigate } from "react-router";
import { CheckForTokens } from "../lib/authUtils";
import { getApplications } from "../lib/applicationController";

export const Dashboard = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [appliedCount, setAppliedCount] = useState<number>(0);
    const [interviewCount, setInterviewCount ] = useState<number>(0);
    const [offerCount, setOfferCount] = useState<number>(0);
    const [error, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigationController = useNavigate();

    useEffect(() => {
        function getAuthStatus(){
            const success = CheckForTokens();
            if (!success){
                navigationController("/login")
            }
        }

        async function applicationRequest(){
            const result = await getApplications();
            if (result instanceof Error){
                setError(result);
                setIsLoading(false);
            } else{
                let interviews = 0;
                let offers = 0;
                let applied = 0;
                setApplications(result);
                for (let i = 0; i < result.length; i++){
                    switch (result[i].Status.toLowerCase()){
                        case "interviewed": {
                            interviews++;
                            break
                        }
                        case "offered": {
                            offers++;
                            break
                        }
                        default:
                            applied ++
                            break
                    }
                }
                setAppliedCount(applied);
                setInterviewCount(interviews);
                setOfferCount(offers);
                setIsLoading(false);
            }
        }

        getAuthStatus();
        applicationRequest();
    }, [navigationController])

    if (isLoading){
        return <p>Loading...</p>
    }
  return (
    <div className="p-6 max-w-4xl mx-auto">
        <p>{error?.message}</p>
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Total Applied</h2>
            <p className="text-3xl">{appliedCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Interviews</h2>
            <p className="text-3xl">{interviewCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Offers</h2>
            <p className="text-3xl">{offerCount}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Job Applications Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Job Applications</h2>
          <Button className="flex items-center gap-2">
            <Plus size={16} /> Add Job
          </Button>
        </div>
        <Table>

            <TableRow className="text-xl font-bold">
              <TableCell >Company</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Applied</TableCell>
            </TableRow>

          
          <TableBody>
            {applications.map((a) => (
                <TableRow>
                    <TableCell>{a.Company}</TableCell>
                    <TableCell>{a.Title}</TableCell>
                    <TableCell>{a.Status}</TableCell>
                    <TableCell>{a.DateAdded}</TableCell>
                </TableRow>
            ))}
            <TableRow>
              <TableCell>Google</TableCell>
              <TableCell>Software Engineer</TableCell>
              <TableCell className="text-green-500">Interviewing</TableCell>
              <TableCell>Jan 15, 2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Amazon</TableCell>
              <TableCell>Backend Developer</TableCell>
              <TableCell className="text-blue-500">Applied</TableCell>
              <TableCell>Jan 10, 2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
