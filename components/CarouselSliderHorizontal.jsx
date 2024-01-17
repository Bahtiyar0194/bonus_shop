import { StyleSheet, View, ScrollView } from "react-native";

export const CarouselSliderHorizontal = (props) => {
    const styles = StyleSheet.create({
        sliderScrollWrap: {
            flexDirection: 'row',
            marginHorizontal: props.marginHorizontal || null,
            gap: 10
        }
    });

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={props.reference}
                style={{ flexGrow: 0 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                fadingEdgeLength={50}
            >
                <View style={styles.sliderScrollWrap}>
                    {props.children}
                </View>
            </ScrollView>
        </View>
    )
}