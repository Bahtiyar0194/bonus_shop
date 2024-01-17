import Container from "../components/Container";
import { ScrollView } from 'react-native';
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function DefaultLayout(props) {
    return (
        <Container padding={10} justifyContent={props.justifyContent || 'space-between'}>
            <Header title={props.title} navigation={props.navigation} />
            <ScrollView fadingEdgeLength={100} style={{ width: '100%', height: '100%' }}>
                {props.children}
            </ScrollView>
            <Footer />
        </Container>
    )
}