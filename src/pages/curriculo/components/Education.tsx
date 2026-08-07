import React from 'react';

import { styles } from '../curriculo.styles';

import { Box, Text, Timeline } from '@/components';

export const Education: React.FC = () => {
    const educations = [
        {
            title: 'CIÊNCIA DA COMPUTAÇÃO',
            institution: 'Centro Universitário Braz Cubas',
            period: '2023 - 2026'
        },
        {
            title: 'ENSINO MÉDIO',
            institution: 'E. E Doutor José Pereira de Queiroz',
            period: '2019 - 2021'
        }
    ];

    return (
        <Box column gap={1} id="education">
            <Text sx={styles.title}>Escolaridade</Text>

            <Timeline
                items={educations.map((edu) => ({
                    title: <Text variant='body2' fontWeight="bold">{edu.title}</Text>,
                    children: (
                        <Box column gap={0.5}>
                            <Text noWrap variant='caption' sx={{ display: 'block' }}>{edu.institution}</Text>
                            <Text variant='caption' color='text.secondary'>{edu.period}</Text>
                        </Box>
                    )
                }))}
            />
        </Box>
    );
};
