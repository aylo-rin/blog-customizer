import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import '../../styles/index.scss';
import styles from './App.module.scss';

export const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);
	const handleApply = (setting: ArticleStateType): void => {
		setAppState(setting);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} currentSettings={appState} />
			<Article />
		</main>
	);
};
