import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../providers/ThemeProvider';

export const Avatar = ({ avatar_file }) => {
    const { colors } = useTheme();

    const avatarSettings = {
        size: 54
    }
    
    return (
        avatar_file
            ?
            <Ionicons name='person-circle-outline' size={avatarSettings.size} color={colors.secondary} />
            :
            <Ionicons name='person-circle-outline' size={avatarSettings.size} color={colors.primary} />
    )
}