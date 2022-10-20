import styled, { css } from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import CheckIconGreen from "../../assets/images/icons/icon_check_gr.png";
import CheckIconWhite from "../../assets/images/icons/icon_check_wh.png";
import { useMutation } from "@tanstack/react-query";
import { deleteFollowUser, followUser } from "../../api/userApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { followedUserIds, loggedInUserId } from "../../atoms/atoms";

const FollowLabel = styled.button<{ isAdmin: boolean; followed: boolean }>`
  background: ${({ theme }) => theme.colors.dasidaGreen};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ isAdmin, theme }) =>
      isAdmin ? theme.colors.white : theme.colors.dasidaGreen};

  position: relative;
  display: block;
  width: 60px;
  height: 20px;
  border-radius: 60px;
  padding: 0px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;

  & + input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  &:before {
    display: none;
    content: "";
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translate(0, -50%);
    width: 0.9em;
    height: 0.9em;
    background: url(${CheckIconGreen}) no-repeat 50% 50% / contain;
    transition: all 0.3s;
  }

  ${({ followed, theme, isAdmin }) =>
    followed &&
    css`
      color: ${theme.colors.dasidaGreen};
      background: ${isAdmin ? theme.colors.white : "transparent"};
      padding: 0 0 0 14px;
      &::before {
        display: block;
      }
    `}
  transition: all 0.3s;
`;

interface FollowToggleSmallType {
  isAdmin: boolean;
  followed: boolean;
  userId?: number;
}

export default function FollowToggleSmall({
  isAdmin,
  followed,
  userId,
}: FollowToggleSmallType) {
  const [isFollowed, setIsFollwed] = useState(false);
  const [followUserId, setFollowUserId] = useRecoilState(followedUserIds);
  const isToken = sessionStorage.getItem("jwtToken");

  const createFollow = useMutation(() => followUser(userId!));
  const deleteFollow = useMutation(() => deleteFollowUser(userId!));

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isToken) {
      if (createFollow.isLoading || deleteFollow.isLoading) return;
      if (isFollowed) {
        deleteFollow.mutate();
        setIsFollwed(false);
        setFollowUserId(followUserId.filter((el) => el !== userId!));
      } else {
        createFollow.mutate();
        setIsFollwed(true);
        setFollowUserId([...followUserId, userId!]);
      }
    } else {
      alert("로그인 후 이용 가능한 기능입니다");
    }
  };

  useEffect(() => {
    setIsFollwed(followed);
  }, [followed]);

  useEffect(() => {
    if (followUserId.find((el) => el === userId!) !== undefined)
      setIsFollwed(true);
    else setIsFollwed(false);
  }, [followUserId, setIsFollwed, userId]);

  return (
    <div>
      <FollowLabel
        isAdmin={isAdmin}
        followed={isFollowed}
        onClick={handleOnClick}>
        팔로우
      </FollowLabel>
      {/* <input
        id="followToggleSmall"
        type="checkbox"
        checked={isFollowed}
        onChange={handleOnChange}
      /> */}
    </div>
  );
}

FollowToggleSmall.defaultProps = {
  isAdmin: false,
  followed: false,
};
