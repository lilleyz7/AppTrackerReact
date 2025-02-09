import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableRow, TableCell, TableBody } from "../components/ui/table";
import { useEffect, useState } from "react";
import { Application } from "../types/Application";
import {  NavLink, useNavigate } from "react-router";
import { CheckForTokens, GetTokens } from "../lib/authUtils";
import { deleteApplication, getApplications, updateApplication } from "../lib/applicationController";
import { UpdateApplicationForm } from "../components/UpdateAppForm";
import { ApplicationDTO } from "../types/ApplicationDTO";
import { logout } from "../lib/authController";

export const Dashboard = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [appliedCount, setAppliedCount] = useState<number>(0);
    const [interviewCount, setInterviewCount ] = useState<number>(0);
    const [offerCount, setOfferCount] = useState<number>(0);
    const [error, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [selectedApp, setSelectedApp] = useState<Application | undefined>(undefined);

    const navigationController = useNavigate();
    const handleDelete = async (id: string) =>{
      setIsLoading(true)
      const result = await deleteApplication(id)
      if (result){
        setError(result)
      setIsLoading(false)
      } else{
        setIsLoading(false)
        alert("Delete Successful")
      }
    }

    const showUpdateForm = (a: Application) => {
      setSelectedApp(a);
      setFormOpen(true);
    }

    const hideForm = () => {
      setFormOpen(false)
    }

    async function handleUpdate(appToUpdate: ApplicationDTO, appId: string){
      const tokens = GetTokens();
          if (tokens instanceof Error){
              logout()
          }
          try{
              const responseValue = await updateApplication(appToUpdate, appId)
              if(responseValue){
                  alert(responseValue)
              }
              hideForm();
          } catch(e){
              alert(e);
              hideForm()
          }
    }

    useEffect(() => {
        async function getAuthStatus(){
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
                    if(result[i].status === "offered"){
                        offers++;
                    } else if (result[i].status === "interviewed"){
                        interviews++;
                    } else{
                        console.log(result[i])
                        applied++
                    }
                }
                console.log(applications)
                setAppliedCount(applied);
                setInterviewCount(interviews);
                setOfferCount(offers);
                setIsLoading(false);
            }
        }

        getAuthStatus();
        applicationRequest();
    }, [navigationController])


  return (
    
    <div className="p-6 max-w-4xl mx-auto">
        {isLoading && (<p>Loading...</p>)}
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

      {formOpen && selectedApp && (
        <UpdateApplicationForm app={selectedApp} update={handleUpdate} hide={hideForm}  />
      )}
      
      {/* Job Applications Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Job Applications</h2>
          <Button className="flex items-center gap-2">
            <NavLink to="/addApp">Add Application</NavLink>
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
                <TableRow key={a.id}>
                    <TableCell ><a href={a.link} className="text-blue-600">{a.company}</a></TableCell>
                    <TableCell>{a.title}</TableCell>
                    <TableCell>{a.status}</TableCell>
                    <TableCell>{a.dateAdded.slice(0, 10)}</TableCell>
                    <TableCell><Button onClick={() => showUpdateForm(a)}>Details</Button></TableCell>
                    <TableCell><Button variant="destructive" onClick={() => handleDelete(a.id)}>Delete</Button></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
