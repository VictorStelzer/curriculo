import React from 'react';

import { Box, Text } from '@/components';

import { styles } from '../curriculo.styles';

export const Profile: React.FC = () => {
    return (
        <Box column gap={1} id="profile">
            <Text sx={styles.title}>Sobre Mim</Text>

            <Text mt={-1}>
                Desenvolvedor Front-End e Mobile especializado em <b>React</b>, <b>React Native</b> e <b>TypeScript</b>.
                Experiência no desenvolvimento de aplicações web e nativas, integração com <b>APIs REST</b>, publicação/builds de aplicativos e documentação técnica.
            </Text>
        </Box>
    )
}