# copy-tuner-react-intl

CopyTuner Client for React Intl

# Installation

```
yarn add @sonicgarden/copy-tuner-react-intl
```

# Usage

Import the css file

```
import '@sonicgarden/copy-tuner-react-intl/css/copyray.css';
```

In YourComponent.jsx:

```
import { RawIntlProvider, FormattedMessage } from 'react-intl';
import { useCopyTuner } from '@sonicgarden/copy-tuner-react-intl';

export const YourComponent = () => {
  const { intl } = useCopyTuner({ locale: 'ja', blurbs: { 'hoge': 'fuga' }, url: `copy-tuner-project-url' });
  
  return (
    <>
      {intl && (
        <RawIntlProvier value={intl}>
          <FormattedMessage id="hoge" />
        </RawIntlProvider>)
      }
    </>
  );
};
```

- Example. With @sonicgarden/copy-tuner-firebase-functions

    ```
    import { useEffect, useState } from 'react';
    import { RawIntlProvider, FormattedMessage } from 'react-intl';
    import { useCopyTuner } from '@sonicgarden/copy-tuner-react-intl';

    const fetchCopyTunerBlurbs = firebase.functions().httpsCallable('fetchCopyTunerBlurbs');
    const getCopyTunerUrl = firebase.functions().httpsCallable('getCopyTunerUrl');

    export const YourComponent = ({ locale }) => {
      const [url, setUrl] = useState();
      const [blurbs, setBlurbs] = useState();
      const { intl } = useCopyTuner({ locale, blurbs, url });
      
      useEffect(() => {
        const fetchUrl = async () => {
          const { data } = await getCopyTunerUrl();
          setUrl(data.url);
        };
        
        fetchUrl();
      }, []);
      
      useEffect(() => {
        const fetchBlurbs = async () => {
          const { data } = await fetchCopyTunerBlurbs({ locale });
          setBlurbs(data.blurbs);
        };
        
        fetchBlurbs();
      }, [locale]);
      
      return (
        <>
          {intl && (
            <RawIntlProvier value={intl}>
              <FormattedMessage id="hoge" />
            </RawIntlProvider>)
          }
        </>
      );
    };
    ```
