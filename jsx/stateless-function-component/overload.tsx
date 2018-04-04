import * as React from 'react';

interface ClickableProps{
	children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps{
	home: JSX.Element;
}

interface SideProps extends ClickableProps{
	side: JSX.Element | string;
}

function MainButton(props: HomeProps): JSX.Element;
function MainButton(prpos: SideProps): JSX.Element;

function MainButton(props: HomeProps | SideProps): JSX.Element{
	if(isHomeProps(props)){
		return <div>Home props.{props.home}</div>
	}else{
		return <div>Side Props. {props.side}</div>;
	}
}

function isHomeProps(props: HomeProps | SideProps): props is HomeProps{
	return (props as HomeProps).home !== undefined;
}