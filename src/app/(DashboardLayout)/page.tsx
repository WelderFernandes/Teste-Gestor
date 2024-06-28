"use client";
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Sample Page',
  },
];

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {/* breadcrumb */}
      <Breadcrumb title="Sample Page" items={BCrumb} />
      {/* end breadcrumb */}
      <DashboardCard title="Sample Page">
        <Typography>This is a sample pages {JSON.stringify(session, null, 2)}</Typography>
      </DashboardCard>
    </PageContainer>
  );
}
