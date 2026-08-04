import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Icon, Text } from '@/components';

import { Book, MenuBook, MusicNote, VideogameAsset } from '@mui/icons-material';

export const Interests: React.FC = () => {
    const interests = [
        { icon: <MusicNote />, name: 'Música' },
        { icon: <VideogameAsset />, name: 'Jogos' },
        { icon: <Book />, name: 'Teologia' },
        { icon: <MenuBook />, name: 'Livros' },
    ]

    return (
        <Box>
            <Text sx={styles.title}>Interesses</Text>

            <Box sx={{ justifyContent: { xs: 'center', md: 'start' }, mb: { xs: 2, md: 0 } }} mt={2} row gap={2}>
                {interests.map((interest, index) => (
                    <Box key={index} column>
                        <Icon color='text.primary' size={24} icon={interest.icon} />
                        <Text variant="subtitle1">{interest.name}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}