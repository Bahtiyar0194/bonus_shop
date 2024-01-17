import Container from "../components/Container";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function CenterLayout(props) {
    return (
        <Container padding={10} justifyContent={props.justifyContent || 'space-between'} alignItems={'center'}>
            <Header title={props.title} navigation={props.navigation} />
            {props.children}
            <Footer />
        </Container>
    )
}