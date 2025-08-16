"use client";

import React from "react";
import ProfileForm from "@/components/forms/ProfileForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import CertificationsForm from "@/components/forms/CertificateForm";
import BlogsForm from "@/components/forms/BlogsForm";
import ActivitiesForm from "@/components/forms/ActivitiesForm";

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

      {section === "Skills" && (
        <SkillsForm skills={data.skills} onChange={(skills) => setData({ ...data, skills })} />
      )}

      {section === "Projects" && (
        <ProjectsForm
          projects={data.projects}
          onChange={(projects) => setData({ ...data, projects })}
        />
      )}

      {section === "Certifications" && (
        <CertificationsForm
          certifications={data.certifications}
          onChange={(certifications) => setData({ ...data, certifications })}
        />
      )}

      {section === "Blogs" && (
        <BlogsForm blogs={data.blogs} onChange={(blogs) => setData({ ...data, blogs })} />
      )}

      {section === "Activities" && (
        <ActivitiesForm
          activities={data.activities}
          onChange={(activities) => setData({ ...data, activities })}
        />
      )}
    </div>
  );
};

export default FormContainer;
