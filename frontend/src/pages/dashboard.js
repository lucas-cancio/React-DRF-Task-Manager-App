import Layout from "../components/layout/Layout";
import { TaskList } from "../components/taskList/taskList";



const DashboardPage = () => {

    return (
        <Layout>
            <div className='container-fluid d-flex justify-content-center'>
                <TaskList />
            </div>
        </Layout>
    );
}

export default DashboardPage;