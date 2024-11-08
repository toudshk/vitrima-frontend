import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './VideoCall.module.scss'
const socket = io(`${process.env.APP_URL}`);
import PhoneIcon from '@mui/icons-material/Phone';
const VideoCall = ({ chatId, setOpenVideoCall }: { chatId: string, setOpenVideoCall:any }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const [callActive, setCallActive] = useState(false);
  useEffect(() => {
    // Присоединение к комнате
    socket.emit('join', chatId);

    const initPeerConnection = () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', { candidate: event.candidate, chatId });
        }
      };

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          if (peerConnection.current && peerConnection.current.signalingState !== 'closed') {
            peerConnection.current.addTrack(track, stream);
          }
        });
      });
    };

    initPeerConnection();

    return () => {
      peerConnection.current?.close();
    };
  }, [chatId]);

  const createOffer = async () => {
    if (peerConnection.current) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit('offer', { offer, chatId });
      setCallActive(true);
    }
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
      setCallActive(false);
      setOpenVideoCall(false)
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    }
  };

  socket.on('offer', async (payload) => {
    const { offer, chatId: incomingChatId } = payload;
    if (!offer || !offer.type || !offer.sdp) {
     
      return;
    }
  
    if (peerConnection.current) {
      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('answer', { answer, chatId });
        setCallActive(true);
      } catch (error) {
        console.error("Error setting remote description for offer or creating answer:", error);
      }
    }
  });
  
  socket.on('answer', async (payload) => {
    const { answer, chatId: incomingChatId } = payload || {};
   
    // Проверка структуры объекта `answer`
    if (!answer || !answer.type || !answer.sdp) {
      console.error("Invalid answer received:", answer);
      return;
    }
  
    try {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error setting remote description for answer:", error);
    }
  });
  socket.on('candidate', async (payload) => {
    const { candidate, chatId: incomingChatId } = payload;
  
    // Проверка на корректность данных
    if (candidate && candidate.candidate && candidate.sdpMid !== undefined && candidate.sdpMLineIndex !== undefined) {
      try {
        await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding received ICE candidate', error);
      }
    } else {
      console.error('Invalid candidate received:', candidate);
    }
  });

  return (
    <div className={styles.videoCallContainer}>
      <div className={styles.videoWrapper}>
        <video ref={localVideoRef} className={`${styles.localVideo} shadow-lg`} autoPlay playsInline muted />
        <video ref={remoteVideoRef} className={`${styles.remoteVideo} shadow-lg`} autoPlay playsInline />
      </div>
      <div className={styles.callButtons}>
        {!callActive ? (
          <button onClick={createOffer} className={`${styles.callButton} ${styles.startCallButton}`}>
            <PhoneIcon/>
          </button>
        ) : (
          <button onClick={endCall} className={`${styles.callButton} ${styles.endCallButton}`}>
            <PhoneIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
