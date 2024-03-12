import { Box, Typography, styled } from "@mui/material";

export const Toolbar = styled(Box)(({theme}) => ({
  position: 'fixed',
  top: 0,
  left: 0, 
  background: theme.palette.gray, 
  height: '48px',
  width: '100vw',
  display: 'flex', 
}))

export const ToolbarFlexItems = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: '15px', 
  alignItems: 'center',
  justifyContent: 'center'
}))

export const Ty = styled(Typography)(({theme}) => ({
  color: 'white',
}))