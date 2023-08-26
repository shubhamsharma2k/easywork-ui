import { Container, Spinner } from '@chakra-ui/react'
import Students from './Students/Students'
import { useStoreActions, useStoreState } from '../store/config'
import SideBar from './SideBar/SideBar'
import Header from './Header'

const Home = () => {
    const { metadataLoading } = useStoreState((state) => state.student)

    return (
        <div>
            <Header />
            <div className="mt-4">
                <Container maxW={'full'} minH={'container.lg'}>
                    {metadataLoading ? (
                        <div className="spinner">
                            <Spinner size={'lg'} thickness="4px" emptyColor="gray.200" color="blue.500" />
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-2">
                                <SideBar />
                            </div>
                            <div className="col-10">
                                <Students />
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default Home
