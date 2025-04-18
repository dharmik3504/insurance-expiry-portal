import Form from "@/components/form";
import axios from "axios";

const EditUser = async ({ params }) => {
  const { uid } = await params;
  //   console.log(`${process.env.BASE_URL}/api/user?uid=67a998bc272350fcb208810e`);
  const res = await axios.get(
    `${process.env.BASE_URL}/api/user/content?content_Id=${uid}`
  );

  if (res.status === 200) return <div>{<Form formData={res.data} />}</div>;
};

export default EditUser;
