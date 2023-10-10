import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { SDKProvider, useSDK, useInitData, useMainButton } from '@tma.js/sdk-react';
import ReactList from 'react-list';
import ListItem from './components/ListItem';
import axios from 'axios';
import { formatDuration } from './utils/format-duration';

type ItemRenderer = (index: number, key: number | string) => JSX.Element;

type Chunk = {
  id: number;
  start: string;
  end: string;
  subtitle: string;
};

const initialItems: Chunk[] = [
  { id: 1, start: "00:00:01", end: "00:00:05", subtitle: "Hello, world!" },
  { id: 2, start: "00:00:06", end: "00:00:10", subtitle: "How are you?" },
  { id: 3, start: "00:00:11", end: "00:00:15", subtitle: "I'm fine, thanks!" },
  { id: 4, start: "00:00:16", end: "00:00:20", subtitle: "Goodbye!" },
  { id: 5, start: "00:00:21", end: "00:00:25", subtitle: "See you later!" },
  { id: 6, start: "00:00:26", end: "00:00:30", subtitle: "Bye!" },
  { id: 7, start: "00:00:31", end: "00:00:35", subtitle: "Bye!" },
  { id: 8, start: "00:00:36", end: "00:00:40", subtitle: "Bye!" },
  { id: 9, start: "00:00:41", end: "00:00:45", subtitle: "Bye!" },
  { id: 10, start: "00:00:01", end: "00:00:05", subtitle: "Hello, world!" },
  { id: 11, start: "00:00:06", end: "00:00:10", subtitle: "How are you?" },
  { id: 12, start: "00:00:11", end: "00:00:15", subtitle: "I'm fine, thanks!" },
  { id: 13, start: "00:00:16", end: "00:00:20", subtitle: "Goodbye!" },
  { id: 14, start: "00:00:21", end: "00:00:25", subtitle: "See you later!" },
  { id: 15, start: "00:00:26", end: "00:00:30", subtitle: "Bye!" },
  { id: 16, start: "00:00:31", end: "00:00:35", subtitle: "Bye!" },
  { id: 17, start: "00:00:36", end: "00:00:40", subtitle: "Bye!" },
  { id: 18, start: "00:00:41", end: "00:00:45", subtitle: "Bye!" },
  { id: 19, start: "00:00:01", end: "00:00:05", subtitle: "Hello, world!" },
  { id: 20, start: "00:00:06", end: "00:00:10", subtitle: "How are you?" },
  { id: 21, start: "00:00:11", end: "00:00:15", subtitle: "I'm fine, thanks!" },
  { id: 22, start: "00:00:16", end: "00:00:20", subtitle: "Goodbye!" },
  { id: 23, start: "00:00:21", end: "00:00:25", subtitle: "See you later!" },
  { id: 24, start: "00:00:26", end: "00:00:30", subtitle: "Bye!" },
  { id: 25, start: "00:00:31", end: "00:00:35", subtitle: "Bye!" },
];

/**
 * This component is responsible for downloading subtitles.
 */
function DownloadButton() {
  const mainButton = useMainButton();
  const initData = useInitData();

  useEffect(() => {
    const downloadSubtitles = async () => {
      const projectId = new URLSearchParams(window.location.search).get('projectId');
      const chatId = initData?.user?.id;
      await axios(`/api/projects/${projectId}/subtitles?chatId=${chatId}`);
    }

    mainButton.enable().show();
    mainButton.on('click', downloadSubtitles);
  }, []);

  useEffect(() => {
    mainButton.setText('Download');
  }, [mainButton]);

  return null;
}

/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
function DisplayGate({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK();
  const errorMessage = useMemo<null | string>(() => {
    if (!error) {
      return null;
    }

    return error instanceof Error ? error.message : 'Unknown error';
  }, [error]);

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return <div>SDK init function is not yet called.</div>;
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return (
      <>
        <p>
          SDK was unable to initialize. Probably, current application is being used
          not in Telegram Web Apps environment.
        </p>
        <blockquote>
          <p>{errorMessage}</p>
        </blockquote>
      </>
    );
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return <div>Loading..</div>;
  }

  // Safely render application.
  return <>{children}</>;
}

/**
 * Root component of the whole project.
 */
export default function App() {
  const [items, setItems] = useState<Chunk[]>([]);

  useEffect(() => {
    const loadSubtitles = async () => {
      const projectId = new URLSearchParams(window.location.search).get('projectId');
      
      if (!projectId) {
        setItems(initialItems);
        return;
      }
      const response = await axios(`https://cp5pk2c3-5173.euw.devtunnels.ms/api/projects/${projectId}`);
      setItems(response.data.map((item: any, index: number) => ({
        id: index,
        start: formatDuration(item.start),
        end: formatDuration(item.end),
        subtitle: item.transcription
      })));
    }

    loadSubtitles()
      .catch((err) => alert(err));
  }, [])

  const renderItem: ItemRenderer = (index: number) => {
    const item = items[index];
    return (
        <ListItem
          key={item.id}
          start={item.start}
          end={item.end}
          subtitle={item.subtitle}
        />
    );
  };

  return (
    <SDKProvider initOptions={{ debug: true, cssVars: true }}>
      <DisplayGate>
          <div className='list-root'>
            <ReactList
              itemRenderer={renderItem}
              length={items.length}
              type='variable'
              useTranslate3d={true}
            />
          </div>
        <DownloadButton />
      </DisplayGate>
    </SDKProvider>
  );
}
