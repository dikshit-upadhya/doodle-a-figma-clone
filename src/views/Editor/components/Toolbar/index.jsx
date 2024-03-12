import { Box, IconButton, Typography } from '@mui/material';
import { Toolbar, ToolbarFlexItems, Ty } from './styled';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function ToolbarComponent() {
	return (
		<Toolbar>
			<ToolbarFlexItems>
				{/* {[
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
				].map((item) => (
					<IconButton>
						<item.icon />
					</IconButton>
				))} */}
			</ToolbarFlexItems>
			<ToolbarFlexItems sx={{flex: 1}}>
				<Ty variant="commonText">Untitled-01</Ty>
			</ToolbarFlexItems>
			<ToolbarFlexItems >
				{/* {[
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
					{ icon: AcUnitIcon },
				].map((item) => (
					<IconButton>
						<item.icon />
					</IconButton>
				))} */}
			</ToolbarFlexItems>
		</Toolbar>
	);
}

export default ToolbarComponent;
