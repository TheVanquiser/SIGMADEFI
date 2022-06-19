import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar'
import styled from 'styled-components';
import GenerateNft from './pages/GenerateNft';
import CreateDIP20 from './pages/CreateDIP20';
import Multisender from './pages/Multisender';
import Buyicp from './pages/BuyICP';
import PlugConnect from './components/plugconnect';
import Sigmadefi from './components/assets/logosigmadefi.png'
const App: React.FunctionComponent = () => {
	return (
		<div className="App">
			<Wrapper>
				<Container>
					<Router>
						<Topbar>
							<Sidebar />
							<Flex>
								<PlugConnect />
							</Flex>
						</Topbar>
						<Content>
							<Routes>
								<Route path='/generatenft' element={<GenerateNft />} />
								<Route path='/create-token' element={<CreateDIP20 />} />
								<Route path='/multisender' element={<Multisender />} />
								<Route path='/buy-icp' element={<Buyicp />} />
							</Routes>
						</Content>
					</Router>
				</Container>
			</Wrapper>
			</div>
	);
}
const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Topbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 74px;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 100vh;
max-width: 1200px;
margin: 0 auto;
`;

const Wrapper = styled.div`
background: #080808;
background-image: url(${Sigmadefi});
font-size: 1rem;
bottom: 0;
`;
export default App
