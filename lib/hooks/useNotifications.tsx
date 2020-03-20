import Notifcation from 'rc-notification';
import { NotificationInstance, NoticeContent } from 'rc-notification/lib/Notification';
import React, { useEffect, useRef } from 'react';

const DEFAULT_PROPS: Partial<NoticeContent> = {
  closable: true,
};

const DEFAULT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  color: 'rgba(0, 0, 0, 0.65)',
  fontFeatureSettings: 'tnum',
  fontSize: '14px',
  fontVariant: 'tabular-nums',
  lineHeight: '1.5715',
  listStyle: 'none',
  margin: '0',
  marginRight: '24px',
  maxWidth: 'calc(100vw - 32px)',
  padding: '0',
  position: 'fixed',
  width: '384px',
  zIndex: 1010,
  right: '0px',
  top: '24px',
  transition: 'all 0.2s',
};

const DEFAULT_BODY_STYLE: React.CSSProperties = {
  background: '#fff',
  borderRadius: '2px',
  boxShadow:
    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  lineHeight: 1.5715,
  marginBottom: '16px',
  overflow: 'hidden',
  padding: '16px 24px',
  position: 'relative',
};

const useNotifications = (props: Omit<NoticeContent, 'content' | 'key' | 'style'> = {}) => {
  const instance = useRef<NotificationInstance | null>(null);

  useEffect(() => {
    Notifcation.newInstance({ style: DEFAULT_CONTAINER_STYLE }, (notification) => {
      instance.current = notification;
    });
  });

  const notify = (content: React.ReactNode) => {
    if (instance.current) {
      instance.current.notice({
        ...DEFAULT_PROPS,
        ...props,
        content,
        style: DEFAULT_BODY_STYLE,
      });
    }
  };

  return { notify };
};

export default useNotifications;
