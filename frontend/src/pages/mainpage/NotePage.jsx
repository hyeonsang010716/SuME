import React from "react";
import MainLayout from "./MainLayout";

const NotePage = ({ id }) => {
  return (
    <MainLayout summation={`노트 ${id}`} isLoading={false} errorMessage="">
      <p className="text-gray-500">노트 ID: {id}</p>
    </MainLayout>
  );
};

export default NotePage;
