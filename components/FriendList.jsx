import React, { PropTypes } from 'react'

import Avatar from '../containers/Avatar.js'

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const styles = {
    ul:{
        display: 'block',
        paddingLeft: '10px',
        margin: '0px'
    },
    li:{
        listStyle: 'none',
        marginTop: '9px',
        paddingBottom: '5px',
        borderBottom: 'solid 1px #E8E1E1'
    },
    span:{
        paddingLeft: '10px',
        color: '#666',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    notification:{
        textAlign: 'center',
        marginRight: '5px',
        width: '21px',
        height: '21px',
        background: 'rgba(255, 80, 71, 0.98)',
        borderRadius: '50%',
        color: 'white',
    }
}

class FriendList extends React.Component{
    constructor(props){
        super(props);
    }
    renderOnlineList(){
        let onlineUsers = this.props.onlineUsers,
            setUserCurRoom = this.props.setUserCurRoom,  
            clearCount = this.props.clearCount,
            badgeCount = this.props.badgeCount, 
            nickname = this.props.nickname,
            list = [];
        for(let item in onlineUsers){
            let user = onlineUsers[item];
            if(user.isOnline && user.nickname !== nickname){
                list.push(
                    <li
                        style = {styles.li}
                        key = {item}
                        data-flex = 'main:center box:first'
                    >
                        <Avatar 
                            src = {user.avatar}
                            size = {39}
                            nickname = {user.nickname}
                        />
                        <div
                            data-flex = 'main:left cross:center box:last'
                            onClick = {()=>{
                                    setUserCurRoom({
                                        curRoom: user.nickname,
                                        isPrivate: true
                                    });
                                    clearCount(user.nickname);
                                }}
                        >
                            <span 
                                style = {styles.span}
                                data-flex-box = '2'
                            >
                                {user.nickname}
                            </span>
                            {
                                badgeCount[user.nickname] ?
                                <span
                                    style = {styles.notification}
                                >
                                    {badgeCount[user.nickname]}                                    
                                </span>
                                : null
                            }
                        </div>
                    </li>
                )
            }
        }
        return list
    }
    renderRoomList(){
        let setUserCurRoom = this.props.setUserCurRoom,  
            clearCount = this.props.clearCount,
            badgeCount = this.props.badgeCount,
            room = {};
        room.avatar = 'http://oajmk96un.bkt.clouddn.com/ppp.png';
        room.name = 'initRoom'
        return (
                <li
                    style = {styles.li}
                    data-flex = 'main:center box:first'
                >
                    <Avatar 
                        src = {room.avatar}
                        size = {39}
                        nickname = ''
                    />
                    <div
                        data-flex = 'main:left cross:center box:last'
                        onClick = {()=>{
                                setUserCurRoom({
                                    curRoom: room.name,
                                    isPrivate: false
                                });
                                clearCount(room.name);
                            }}
                    >
                        <span 
                            style = {styles.span}
                            data-flex-box = '2'
                        >
                            initRoom
                        </span>
                        {
                            badgeCount[room.name] ?
                            <span
                                style = {styles.notification}
                            >
                                {badgeCount[room.name]}                                    
                            </span>
                            : null
                        }
                    </div>
                </li>
            )
    }
    render(){
        let isShowRoom = this.props.isShowRoom;
        let list = isShowRoom ? this.renderRoomList() : this.renderOnlineList();
        return (
            <div
                style = {{
                    height:'100%',
                }}
            >
                <Subheader>online chats</Subheader>
                <Divider />
                <div
                    style = {{
                        height:'90%',
                        overflowY:'scroll',
                    }}
                >
                    <ul style = {styles.ul}>
                        {list}
                    </ul>
                </div>
            </div>
        );
    }
}
FriendList.propTypes = {
    onlineUsers: PropTypes.object,
    setUserCurRoom: PropTypes.func,
    clearCount: PropTypes.func,
    badgeCount: PropTypes.object,
    nickname: PropTypes.string,
    isShowRoom: PropTypes.bool
}
export default FriendList;