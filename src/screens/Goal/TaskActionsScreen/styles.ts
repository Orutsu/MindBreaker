import { StyleSheet } from 'react-native'
import { COLORS } from '../../../styles';
import { SCREEN_WIDTH } from '../../../styles/helpers';

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: COLORS.WHITE_SMOKE,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    nameItem: {
        fontWeight: 'bold',
        fontSize: 45
    },
    descriptionItem: {
        fontSize: 35
    },
    button: {
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    separatorLine: {
        backgroundColor: 'grey',
        height: 1,
        marginTop: 20,
        marginLeft: -20,
        width: SCREEN_WIDTH,
    },
});
