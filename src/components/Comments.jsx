import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from '../ThemeContext';

const Comments = () => {
    const { themeMode } = useTheme();

    // Determine the Giscus theme based on the current app theme
    const giscusTheme = themeMode === 'dark' ? 'transparent_dark' : 'light';

    return (
        <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-tempo-text">
                Comments
            </h3>
            <div className="glass-panel p-6 rounded-2xl">
                <Giscus
                    id="comments"
                    repo="BCSP31415/my-blog"
                    repoId="R_kgDOQhKFSA"
                    category="Announcements"
                    categoryId="DIC_kwDOQhKFSM4Czbp3"
                    mapping="pathname"
                    term="Welcome to @giscus/react component!"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={giscusTheme}
                    lang="zh-CN"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default Comments;
