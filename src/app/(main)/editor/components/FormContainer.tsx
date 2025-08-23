"use client";

import React from "react";
import ProfileForm from "@/app/(main)/editor/components/forms/ProfileForm";
import ProjectsForm from "@/app/(main)/editor/components/forms/ProjectsForm";

interface FormContainerProps {
  section: string;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const FormContainer: React.FC<FormContainerProps> = ({ section, data, setData }) => {
  return (
    <div className="space-y-6">
      {section === "Profile" && (
        <ProfileForm
          data={data.profile}
          onChange={(field, value) =>
            setData({ ...data, profile: { ...data.profile, [field]: value } })
          }
        />
      )}



      {section === "Projects" && (
        <ProjectsForm
          projects={data.projects}
          onChange={(projects) => setData({ ...data, projects })}
        />
      )}



    </div>
  );
};

export default FormContainer;
