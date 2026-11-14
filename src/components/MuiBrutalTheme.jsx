import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, TextField, Switch, FormControlLabel } from '@mui/material';

export function MuiBrutalTheme() {
  const [isDark, setIsDark] = useState(true);

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: isDark ? '#ededed' : '#111111' },
      background: { default: isDark ? '#1b1b1b' : '#e9e5d8', paper: isDark ? '#292929' : '#f6f5ef' },
      text: { primary: isDark ? '#d0d0d0' : '#111111' }
    },
    typography: { fontFamily: '"Roboto Mono", monospace' },
    shape: { borderRadius: 0 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            border: '2px solid',
            boxShadow: '4px 4px 0 #111',
            '&:active': { boxShadow: '0px 0px 0 #111', transform: 'translate(4px, 4px)' }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              '& fieldset': { borderWidth: '2px' }
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="lab-card" style={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="lab-card__title" style={{ borderBottomColor: theme.palette.text.primary, color: theme.palette.text.primary }}>04 / Тема (Material-UI)</h2>
          <FormControlLabel
            control={<Switch checked={isDark} onChange={() => setIsDark(!isDark)} color="primary" />}
            label="Темна тема"
            sx={{ fontFamily: 'var(--font-mono)' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
          <TextField label="Ваше ім'я" variant="outlined" size="small" />
          <Button variant="contained">Брутальна кнопка</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
