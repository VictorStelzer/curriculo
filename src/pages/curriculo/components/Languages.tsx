import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, BulletText, Text } from '@/components';

export const Languages: React.FC = () => {
    const languages = [
        {
            name: 'Inglês',
            level: 'Avançado'
        },
        {
            name: 'Espanhol',
            level: 'Intermediário'
        }
    ];

    return (
        <Box column gap={1} mt={-2}>
            <Text sx={styles.title}>Idiomas</Text>

            {languages.map((lang, index) => (
                <Box key={index} column gap={1}>
                    <BulletText variant='body2'>{lang.name} - {lang.level}</BulletText>
                </Box>
            ))}
        </Box>
    )
}