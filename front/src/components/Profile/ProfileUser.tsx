import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

import useGetMe from '@/hooks/useGetMe';
import TextButton from '@/components/Common/Button/Text';

function profileUser() {
  console.log('user rerender');
  const router = useRouter();
  const { loading, user } = useGetMe();

  if (loading) return <p>...loading</p>;
  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <ProfileUserBlock>
      <div className="profile-wrapper">
        <Image
          loader={imageLoader}
          src={user.providerAvatar}
          width="122"
          height="122"
          alt="profile image"
          layout="intrinsic"
          className="profile-image"
        />
        <section className="profile-contents">
          <h1 className="profile-name">{user?.providerName}</h1>
          <span className="profile-email">{user?.providerEmail}</span>
        </section>
      </div>

      <TextButton
        label="계정 설정"
        styleType="primary"
        size="large"
        fullWidth
        className="profile-auth-btn"
      />
    </ProfileUserBlock>
  );
}

const ProfileUserBlock = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .profile-wrapper {
    display: flex;
    width: 100%;
    max-width: 360px;
    justify-content: space-between;
    align-items: center;

    .profile-image {
      border-radius: 0.8rem;
    }
    .profile-contents {
      .profile-name {
        font-size: 2.8rem;
        font-weight: 600;
      }
      .profile-email {
        display: block;
        margin-top: 1.2rem;
        font-size: 1.6rem;
        color: ${({ theme }) => theme['font-inactive']};
      }
    }
  }
  .profile-auth-btn {
    max-width: 360px;
    margin-top: 3.6rem;
    height: 56px;
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 96px;
    border-bottom: 1px solid ${(props) => props.theme['header-line']};
  }
`;

function imageLoader({ src }: { src: string }) {
  return src;
}

export default React.memo(profileUser);
