import React from 'react';

import { Box, Text } from '@/components';

import { styles } from '../curriculo.styles';

export const Profile: React.FC = () => {
    return (
        <Box column gap={1} id="profile">
            <Text sx={styles.title}>Sobre Mim</Text>

            <Text mt={-1}>
                Desenvolvedor com experiência na criação, manutenção e publicação de aplicações web e mobile utilizando <b>React</b>, <b>React Native</b> e <b>TypeScript</b>. Atuação na integração de <b>APIs REST</b>, criação de componentes reutilizáveis, estruturação de pipelines de <b>CI/CD</b>, geração de <b>builds nativas</b> e elaboração de <b>documentação técnica</b> de sistemas.
            </Text>
        </Box>
    )
}