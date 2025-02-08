import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ApplicationDTO } from "../types/ApplicationDTO";
import { CheckForTokens, GetTokens } from "../lib/authUtils";
import { logout } from "../lib/authController";
import { useNavigate } from "react-router";
import { addApplication } from "../lib/applicationController";

export const AddApplicationForm = () => {
    const navigationController = useNavigate();
    useEffect(() => {
        const loggedIn = CheckForTokens();
        if(!loggedIn){
            navigationController("/dashboard")
        }
    }, [navigationController])

    const [formData, setFormData] = useState({
        company: "",
        title:"",
        status: "",
        link: "",
        notes: "",
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function saveApp() {
    const tokens = GetTokens();
    if (tokens instanceof Error){
        logout()
    }
    try{
        const app: ApplicationDTO = {
            Title: formData.title,
            Company: formData.company,
            Notes: formData.notes,
            Status: formData.status,
            Link: formData.link
        }
        const responseValue = await addApplication(app)
        if(responseValue){
            alert(responseValue)
        }
        navigationController("/dashboard")
    } catch(e){
        alert(e);
    }
  }

  const onCancelChanges = () => {
    setFormData({company: "",
    title:"",
    status:  "",
    link:  "",
    notes:  ""})
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveApp();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">
            Add Job Application
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                type="text" 
                value={formData.company} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                type="text" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="status">Status</Label>
              <Input 
                id="status" 
                name="status" 
                type="text" 
                value={formData.status} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="link">Link</Label>
              <Input 
                id="link" 
                name="link" 
                type="url" 
                value={formData.link} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" onClick={onCancelChanges} className="bg-gray-500">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};



