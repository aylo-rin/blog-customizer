import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (setting: ArticleStateType) => void;
	currentSettings?: ArticleStateType;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply, currentSettings = defaultArticleState } = props;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState(currentSettings);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		onChange: setIsSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		rootRef: sidebarRef,
	});

	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleChange = (field: keyof ArticleStateType) => {
		return (value: OptionType): void => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[field]: value,
			}));
		};
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
