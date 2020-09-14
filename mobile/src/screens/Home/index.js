import * as React from 'react'

import {
	Container,
	Header,
	Content,
	Footer,
	FooterTab,
	Button,
	Icon,
	Text,
	Badge,
} from 'native-base'

export default (function(props) {
	return (
		<Container>
			<Content />
			<Footer>
				<FooterTab>
					<Button
						vertical
						active
						onPress={() => props.navigation.navigate('Home')}>
						<Icon name="apps" />
						<Text>Home</Text>
					</Button>
					<Button
						vertical
						onPress={() => props.navigation.navigate('Scan Tag')}>
						<Icon name="camera" />
						<Text>Scan tag</Text>
					</Button>
					<Button
						vertical
						onPress={() => props.navigation.navigate('Scan Tag')}>
						<Icon active name="settings" />
						<Text>Settings</Text>
					</Button>
				</FooterTab>
			</Footer>
		</Container>
	)
})
