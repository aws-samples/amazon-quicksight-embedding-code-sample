import React, { useContext } from 'react'; 
import {UserContext} from '../context/UserContext'
import {EmbedTypeContext } from '../context/EmbedTypeContext';
import {AnonymousDashboardEmbedding, AnonymousQEmbedding, AnonymousVisualEmbedding, UserBasedDashboardEmbedding, UserBasedConsoleEmbedding, UserBasedQEmbedding, UserBasedVisualEmbedding} from "../embedding-components";

export default function Dashboard(){ 
	
	const { user } = useContext(UserContext);
	const { embedType,embedViewType } = useContext(EmbedTypeContext);
	
	return( 
		<div>
			{embedType === 'Anonymous Embedding' && embedViewType === 'Visual View' &&
				<AnonymousVisualEmbedding tagValue={user['custom:company']}/>
			}			
			{embedType === 'Anonymous Embedding' && embedViewType === 'Dashboard View' &&
				<AnonymousDashboardEmbedding tagValue={user['custom:company']}/>
			}
			{embedType === 'Anonymous Embedding' && embedViewType === 'Q-Bar View' &&
				<AnonymousQEmbedding tagValue={user['custom:company']}/>
			}	
			{embedType === 'User-Based Embedding' && embedViewType === 'Visual View' &&
				<UserBasedVisualEmbedding/>
			}		
			{embedType === 'User-Based Embedding' && embedViewType === 'Dashboard View' &&
				<UserBasedDashboardEmbedding/>
			}
			{/* {embedType === 'User-Based Embedding' && embedViewType === 'Q-Bar View' &&
				<UserBasedQEmbedding/>
			}				 */}
			{embedType === 'User-Based Embedding' && embedViewType === 'Console View' && user['custom:role'] === "Author" &&	
				<UserBasedConsoleEmbedding/>
			}

		</div> ) }