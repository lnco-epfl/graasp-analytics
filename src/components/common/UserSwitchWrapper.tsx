import { CompleteMember } from '@graasp/sdk';
import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { GRAASP_ACCOUNT_HOST } from '@/config/env';
import { SIGN_IN_PATH } from '@/config/externalPaths';
import { mutations } from '@/config/queryClient';
import {
  HEADER_MEMBER_MENU_BUTTON_ID,
  HEADER_MEMBER_MENU_SEE_PROFILE_BUTTON_ID,
  HEADER_MEMBER_MENU_SIGN_IN_BUTTON_ID,
  HEADER_MEMBER_MENU_SIGN_OUT_BUTTON_ID,
  buildMemberMenuItemId,
} from '@/config/selectors';

import { useAnalyticsTranslation } from '../../config/i18n';
import { hooks } from '../../config/queryClient';
import MemberAvatar from './MemberAvatar';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { t } = useAnalyticsTranslation();
  const { mutateAsync: signOut } = mutations.useSignOut();

  const renderAvatar = (m?: CompleteMember | null) => (
    <MemberAvatar id={m?.id} />
  );

  return (
    <GraaspUserSwitch
      ButtonContent={ButtonContent}
      signOut={signOut}
      currentMember={member}
      userMenuItems={[]}
      isCurrentMemberLoading={isLoading}
      seeProfileText={t('SEE_PROFILE_TEXT')}
      signedOutTooltipText={t('USER_SWITCH_SIGNED_OUT_TOOLTIP')}
      signOutText={t('USER_SWITCH_SIGN_OUT_BUTTON')}
      switchMemberText={t('USER_SWITCH_SIGN_IN_TEXT')}
      profilePath={GRAASP_ACCOUNT_HOST}
      redirectPath={SIGN_IN_PATH}
      renderAvatar={renderAvatar}
      buttonId={HEADER_MEMBER_MENU_BUTTON_ID}
      signInMenuItemId={HEADER_MEMBER_MENU_SIGN_IN_BUTTON_ID}
      signOutMenuItemId={HEADER_MEMBER_MENU_SIGN_OUT_BUTTON_ID}
      seeProfileButtonId={HEADER_MEMBER_MENU_SEE_PROFILE_BUTTON_ID}
      buildMemberMenuItemId={buildMemberMenuItemId}
    />
  );
};

export default UserSwitchWrapper;
