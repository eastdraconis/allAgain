import { useState } from "react";
import styled from "styled-components";
import { FollowUserRes } from "../../types/userTypes";
import FollowToggle from "../common/FollowToggle";
import FollowersTab from "./FollowersTab";

interface UserBannerProps {
  userId: string;
  imageUrl: string;
  nickname: string;
  isMyDetail: boolean;
  followed: boolean;
  followees: FollowUserRes;
  followers: FollowUserRes;
  NumberOfFeeds: number;
}

function UserBanner({
  userId,
  imageUrl,
  nickname,
  isMyDetail,
  followed,
  followees,
  followers,
  NumberOfFeeds,
}: UserBannerProps) {
  const [modalActive, setModalActive] = useState<boolean>(false);

  const handleInfoClick = () => {
    setModalActive(true);
    console.log("test");
  };

  return (
    <UserProfileContainer>
      <UserProfileImage src={"http://" + imageUrl} />
      <UserNickname>{nickname}</UserNickname>
      {isMyDetail || (
        <FollowToggle followed={followed} userId={parseInt(userId)} />
      )}
      <UserInfoContainer>
        <UserInfo>{`게시글 수 ${NumberOfFeeds}`}</UserInfo>
        <UserInfo
          onClick={handleInfoClick}>{`팔로워 ${followers?.count}`}</UserInfo>
        <UserInfo
          onClick={handleInfoClick}>{`팔로잉 ${followees?.count}`}</UserInfo>
      </UserInfoContainer>
      {modalActive && (
        <FollowersTab
          followees={followees}
          followers={followers}
          removeFunction={() => setModalActive(false)}
        />
      )}
    </UserProfileContainer>
  );
}

const UserProfileContainer = styled.div`
  width: 100%;
  min-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(240, 230, 203, 0.2);
  padding: 170px 80px 0;
`;

const UserProfileImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 70px;
`;

const UserNickname = styled.div`
  height: 28px;
  font-size: 28px;
  line-height: 28px;
  margin-top: 32px;
  margin-bottom: 28px;
  text-align: center;
  color: #000000;
`;

const UserInfoContainer = styled.div`
  margin-top: 50px;
  width: 712px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const UserInfo = styled.div`
  width: 200px;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

export default UserBanner;
