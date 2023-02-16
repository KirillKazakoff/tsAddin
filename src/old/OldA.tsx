// /* eslint-disable global-require */
// /* eslint-disable class-methods-use-this */
// import React from 'react';
// import { DefaultButton } from '@fluentui/react';
// import Header from './Header';
// import HeroList, { HeroListItem } from './HeroList';
// import Progress from './Progress';

// /* global Excel  */

// export interface AppProps {
//     title: string;
//     isOfficeInitialized: boolean;
// }

// export interface AppState {
//     listItems: HeroListItem[];
// }

// export default class App extends React.Component<AppProps, AppState> {
//     constructor(props, context) {
//         super(props, context);
//         this.state = {
//             listItems: [],
//         };
//         this.click();
//     }

//     componentDidMount() {
//         this.setState({
//             listItems: [
//                 {
//                     icon: 'Ribbon',
//                     primaryText: 'Achieve more with Office integration',
//                 },
//                 {
//                     icon: 'Unlock',
//                     primaryText: 'Unlock features and functionality',
//                 },
//                 {
//                     icon: 'Design',
//                     primaryText: 'Create and visualize like a pro',
//                 },
//             ],
//         });
//     }

//     click = async () => {
//         try {
//             await Excel.run(async (context) => {
//                 const sheet = context.workbook.worksheets.getItem('Sheet1');
//                 const table = sheet.tables.getItem('Коносаменты');
//                 const range = table.getRange();
//                 range.load('values');
//                 await context.sync();

//                 console.log(range.values);
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     render() {
//         const { title, isOfficeInitialized } = this.props;

//         if (!isOfficeInitialized) {
//             return (
//                 <Progress
//                     title={title}
//                     logo={require('../../../assets/logo-filled.png')}
//                     message='Please sideload your addin to see app body.'
//                 />
//             );
//         }

//         return (
//             <div className='ms-welcome'>
//                 <Header
//                     logo={require('../../../assets/logo-filled.png')}
//                     title={this.props.title}
//                     message='Welcome'
//                 />
//                 <HeroList
//                     message='Discover what Office Add-ins can do for you today!'
//                     items={this.state.listItems}
//                 >
//                     <DefaultButton
//                         className='ms-welcome__action'
//                         iconProps={{ iconName: 'ChevronRight' }}
//                         onClick={this.click}
//                     >
//                         Run
//                     </DefaultButton>
//                 </HeroList>
//             </div>
//         );
//     }
// }
