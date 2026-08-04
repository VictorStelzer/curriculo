import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, BulletText, Text } from '@/components';

export const Skills: React.FC = () => {
    const skills = [
        { name: 'React & React Native' },
        { name: 'TypeScript / JS' },
        { name: 'Vue.js' },
        { name: 'Flutter' },
        { name: 'Excel (Especialista)' },
        { name: 'Power BI + DAX' },
        { name: 'Python' },
        { name: 'Git & GitHub' }
    ];

    return (
        <Box id="skills">
            <Text sx={styles.title}>Skills</Text>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                {skills.map((skill, index) => (
                    <BulletText key={index} variant='body2'>{skill.name}</BulletText>
                ))}
            </Box>
        </Box>
    )
}