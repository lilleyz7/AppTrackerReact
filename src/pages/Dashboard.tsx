import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../components/ui/table";
import { Plus } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Total Applied</h2>
            <p className="text-3xl">12</p>
          </CardContent>
        </Card>
        <Card className="bg-green-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Interviews</h2>
            <p className="text-3xl">3</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500 text-white">
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold">Offers</h2>
            <p className="text-3xl">1</p>
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
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Applied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
