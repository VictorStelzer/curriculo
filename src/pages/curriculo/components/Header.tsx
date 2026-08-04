import React from 'react';

import { IMAGES } from '@/constants';

import { Download, LocationOnOutlined, Mail, Phone } from '@mui/icons-material';

import { Box, Button, Icon, IconButton, Image, Text, TextButton, ToggleTheme } from '@/components';

interface HeaderSectionProps {
    isDownloading?: boolean;
    onDownload?: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ isDownloading, onDownload }) => {
    const infos = [
        {
            icon: <LocationOnOutlined />,
            text: 'Mogi das Cruzes - SP'
        },
        {
            icon: <Mail />,
            text: "victor@originaal.com.br",
            url: 'mailto:victor@originaal.com.br'
        },
        {
            icon: <Phone />,
            text: '(11) 9 9443-4146',
            url: 'https://wa.me/5511994434146'
        }
    ];

    return (
        <Box id="home" column gap={2}>
            <Box row position="relative" alignItems="flex-start" justifyContent={{ xs: 'center', md: 'space-between' }}>
                <IconButton hideDown='md' onClick={onDownload} disabled={isDownloading} data-pdf-hide="true">
                    <Icon color='text.primary' size={18} icon={<Download />} />
                </IconButton>

                <Box center column gap={1}>
                    <Image circle src={IMAGES.curriculo.victor} width={120} mb={1} />

                    <Text variant='h5'>Victor <b>Stelzer</b></Text>
                    <Text variant='subtitle2'>Desenvolvedor <b>Fullstack</b></Text>
                </Box>

                <ToggleTheme data-pdf-hide="true" sx={{ position: { xs: 'absolute', md: 'static' }, top: 0, right: 0 }} />
            </Box>

            <Box color="text.primary" center hideUp='md'>
                <Button color="inherit" radius={10} variant='outlined' onClick={onDownload} disabled={isDownloading} data-pdf-hide="true">Download</Button>
            </Box>

            <Box column gap={1}>
                {infos.map((info, index) => (
                    <Box key={index} row alignItems gap={1}>
                        <Icon color='text.primary' size={18} icon={info.icon} />
                        <TextButton color='textPrimary' href={info.url}>
                            {info.text}
                        </TextButton>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
