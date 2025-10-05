'use client';
import { Typography } from "@mui/material";
import { DeviceThermostatOutlined, Forest, Air } from '@mui/icons-material';
import { CardContainer, CardHeader, CardBody, CardFooter, IconContainer } from "./style";

interface ICardProps {
    icon: string;
    value: string;
    description: string;
}

export default function Card({ icon, value, description }: ICardProps) {
    return (
        <CardContainer>
            <CardHeader>
                {icon == "temperature" && <IconContainer><DeviceThermostatOutlined sx={{ fontSize: 25, color: '#ff6b35' }} /></IconContainer>}
                {icon == "ndvi" && <IconContainer><Forest sx={{ fontSize: 25, color: '#4caf50' }} /></IconContainer>}
                {icon == "aod" && <IconContainer><Air sx={{ fontSize: 25, color: '#3F51B5' }} /></IconContainer>}
            </CardHeader>
            <CardBody>
                <Typography fontSize={"2rem"} sx={{ color: '#333', fontWeight: 'bold' }}>{value}</Typography>
            </CardBody>
            <CardFooter>
                <Typography fontSize={"0.8rem"} sx={{ color: '#666' }}>{description}</Typography>
            </CardFooter>
        </CardContainer>
    )
}