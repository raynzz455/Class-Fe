import { useEffect, useState } from 'react';
import { DataTable } from './data-table'; 
import { columns, userTable } from './collum'; 
import { fetchUserData } from './apiService'; 


const DashboardAdmin = () => {
  const [data, setData] = useState<userTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await fetchUserData();
        setData(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className='px-5'>
      <div>
        Welcome to Admin Dashboard
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default DashboardAdmin;
