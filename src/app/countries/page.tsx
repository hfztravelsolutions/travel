// app/countries/page.tsx
import { createServerSupabaseClient } from "@/utils/supabase";

const Page = async () => {
  const supabase = await createServerSupabaseClient();
  const { data: countries, error } = await supabase.from("countries").select();

  if (error) {
    console.error("Error fetching countries:", error);
    return <div>Error fetching countries</div>;
  }

  return (
    <div>
      <h1>Countries List</h1>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </div>
  );
};

export default Page;
