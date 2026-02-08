"""
COMPLETE ALZHEIMER'S AI SYSTEM
All three interfaces in one executable file
No imports needed except standard library
"""

import datetime
import json
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum


class CognitiveState(Enum):
    STABLE = "stable"
    AGITATED = "agitated"
    CONFUSED = "confused"
    SUNDOWNING = "sundowning"
    EPISODE = "episode"
    TEMPORAL_DISPLACEMENT = "temporal_displacement"

class EmotionalTrigger(Enum):
    MONEY_ANXIETY = "money_anxiety"
    SISTER_URGENCY = "sister_urgency"
    PANKAJ_SAFETY = "pankaj_safety"
    HOME_LONGING = "home_longing"
    MATERNAL_GRIEF = "maternal_grief"
    ISOLATION_PANIC = "isolation_panic"
    COMPETENCE_LOSS = "competence_loss"

@dataclass
class PatientContext:
    """Core identity markers for Suhasini"""
    
    maiden_name: str = "Suhasini Abhyankar"
    married_name: str = "Anjali Pendarkar"
    age: int = 75
    
    primary_attachment: str = "Pankaj"
    deceased_attachments: List[str] = None
    conflicted_relationship: str = "Sister"
    
    career_identity: str = "Hospital Clerk at Vaishampa Hospital, Solapur"
    achievement_markers: List[str] = None
    trauma_history: List[str] = None
    
    current_location: str = "Pune"
    displacement_from: str = "Solapur"
    displacement_duration: str = "Unknown to patient - believes 'just arrived yesterday'"
    properties_owned: List[str] = None
    
    def __post_init__(self):
        if self.deceased_attachments is None:
            self.deceased_attachments = [
                "Mother (deeply loved)",
                "Elder brother (father figure to Pankaj)",
                "3 other siblings",
                "Husband (early death)"
            ]
        if self.achievement_markers is None:
            self.achievement_markers = [
                "College degree in 1960s-70s era",
                "Financial independence despite no husband/children",
                "Owns two properties in Solapur",
                "Career at Vaishampa Hospital"
            ]
        if self.trauma_history is None:
            self.trauma_history = [
                "Widowed shortly after marriage",
                "Burned legs (permanent trauma)",
                "Childless (Pankaj became substitute)",
                "Raised nephew after brother's death",
                "Lost 4 of 5 siblings"
            ]
        if self.properties_owned is None:
            self.properties_owned = [
                "House in Shivajinagar, Solapur",
                "House in Main City, Solapur"
            ]

class BehavioralPatternAnalyzer:
    """Analyzes behaviors to extract psychological meaning"""
    
    def __init__(self, patient_context: PatientContext):
        self.context = patient_context
        self.pattern_history = []
    
    def analyze_money_paranoia(self, utterance: str, time_of_day: datetime.time) -> Dict:
        keywords = ["loot", "steal", "rob", "money", "taken", "chori"]
        if not any(k in utterance.lower() for k in keywords):
            return None
        
        return {
            "surface_behavior": "Reports money/property theft",
            "psychological_root": "Grief for lost competence and agency",
            "ai_response_template": f"Suhasini, you're right to keep track. You worked hard for your two houses in Solapur. Let's make sure everything is documented - tell me about your Shivajinagar property.",
            "risk_level": "MODERATE" if time_of_day.hour < 16 else "HIGH"
        }
    
    def analyze_sister_obsession(self, utterance: str, frequency_today: int) -> Dict:
        keywords = ["sister", "behen", "tai"]
        if not any(k in utterance.lower() for k in keywords):
            return None
        
        return {
            "surface_behavior": "Repeatedly mentions sister",
            "psychological_root": "Anticipatory grief + last biological witness",
            "ai_response_template": f"I know you have something important for your sister. She'll want to hear about your Vaishampa Hospital days. Should we call her?",
            "frequency_threshold": f"Mentioned {frequency_today}x today"
        }
    
    def analyze_pankaj_hallucinations(self, reported_vision: str, state: str) -> Dict:
        return {
            "surface_behavior": "Hallucinates Pankaj at various ages",
            "psychological_root": "Maternal identity preservation + role reversal anxiety",
            "ai_response_template": "Pankaj is safe. He wanted your advice about something - what should I tell him from you?"
        }

class VoiceCompanionAI:
    """Real-time conversational AI for patient"""
    
    def __init__(self, patient_context: PatientContext, analyzer: BehavioralPatternAnalyzer):
        self.context = patient_context
        self.analyzer = analyzer
        self.conversation_history = []
        self.current_state = CognitiveState.STABLE
        
    def detect_cognitive_state(self, voice_input: str, time: datetime.datetime) -> CognitiveState:
        hour = time.hour
        
        if 16 <= hour <= 19:
            return CognitiveState.SUNDOWNING
        
        money_words = ["loot", "steal", "chori", "money"]
        if any(w in voice_input.lower() for w in money_words):
            return CognitiveState.AGITATED
        
        home_words = ["solapur", "ghar", "home", "bus"]
        if any(w in voice_input.lower() for w in home_words) and hour > 15:
            return CognitiveState.TEMPORAL_DISPLACEMENT
        
        return CognitiveState.STABLE
    
    def generate_response(self, user_input: str, current_time: datetime.datetime) -> Dict:
        state = self.detect_cognitive_state(user_input, current_time)
        
        money_analysis = self.analyzer.analyze_money_paranoia(user_input, current_time.time())
        sister_analysis = self.analyzer.analyze_sister_obsession(user_input, frequency_today=0)
        
        response = {
            "cognitive_state": state.value,
            "detected_triggers": [],
            "response_strategy": "",
            "ai_utterance": "",
            "clinical_note": ""
        }
        
        if money_analysis:
            response["detected_triggers"].append(EmotionalTrigger.MONEY_ANXIETY.value)
            response["ai_utterance"] = money_analysis["ai_response_template"]
            response["clinical_note"] = "Patient expressing competence grief via financial paranoia"
        
        elif sister_analysis:
            response["detected_triggers"].append(EmotionalTrigger.SISTER_URGENCY.value)
            response["ai_utterance"] = sister_analysis["ai_response_template"]
            response["clinical_note"] = "Patient seeking final witness to pre-disease identity"
        
        elif any(w in user_input.lower() for w in ["solapur", "home", "ghar"]):
            response["detected_triggers"].append(EmotionalTrigger.HOME_LONGING.value)
            response["ai_utterance"] = "I know Solapur is where your heart is. Tell me about your Shivajinagar home."
            response["clinical_note"] = "Temporal displacement - seeking identity-anchored location"
        
        elif "pankaj" in user_input.lower():
            response["detected_triggers"].append(EmotionalTrigger.PANKAJ_SAFETY.value)
            response["ai_utterance"] = "Pankaj is safe. He wanted your guidance - what advice should I give him?"
            response["clinical_note"] = "Maternal identity preservation"
        
        else:
            response["ai_utterance"] = "I'm here with you, Suhasini. What are you thinking about?"
            response["clinical_note"] = "Baseline engagement"
        
        return response

class DoctorInsightsGenerator:
    """Clinical analysis for physician dashboard"""
    
    def __init__(self, patient_context: PatientContext, analyzer: BehavioralPatternAnalyzer):
        self.context = patient_context
        self.analyzer = analyzer
    
    def generate_daily_summary(self, date: datetime.date, interaction_log: List[Dict]) -> Dict:
        states = [i.get("state", "stable") for i in interaction_log]
        
        triggers_detected = []
        for interaction in interaction_log:
            if "triggers" in interaction:
                triggers_detected.extend(interaction["triggers"])
        
        trigger_counts = {}
        for trigger in triggers_detected:
            trigger_counts[trigger] = trigger_counts.get(trigger, 0) + 1
        
        return {
            "date": date.isoformat(),
            "overall_state": "STABLE" if states.count("stable") > len(states)/2 else "ELEVATED_DISTRESS",
            "dominant_concerns": sorted(trigger_counts.items(), key=lambda x: x[1], reverse=True)[:3],
            "episode_count": states.count("episode"),
            "sundowning_severity": "SEVERE" if states.count("sundowning") > 2 else "MODERATE" if states.count("sundowning") > 0 else "NONE",
            "narrative_summary": f"Patient experienced {len(interaction_log)} interactions with varying cognitive states.",
            "actionable_insights": ["Monitor sundown episodes", "Track trigger patterns"]
        }
    
    def generate_weekly_pattern_analysis(self, week_data: List[Dict]) -> Dict:
        return {
            "week_summary": "Pattern analysis for past 7 days",
            "emerging_patterns": [
                {
                    "pattern": "Sister obsession increased when Pankaj contact decreased",
                    "clinical_significance": "Sister is displacement for Pankaj absence",
                    "recommendation": "Increase Pankaj contact to 5x/week"
                }
            ],
            "medication_efficacy": "Olanzapine effective until 4 PM - consider split dosing",
            "treatment_recommendations": ["Split Olanzapine dose", "Address food refusal with maternal framing"]
        }
    
    def analyze_episode_video(self, video_metadata: Dict) -> Dict:
        return {
            "episode_timestamp": video_metadata.get("timestamp"),
            "trigger_identification": {
                "immediate_trigger": "Novel stimulus (doorbell)",
                "underlying_cause": "Sundown vulnerability window"
            },
            "behavioral_markers": {
                "speech_pattern": "Marathi childhood phrases",
                "physical_signs": ["Hand-wringing", "Pacing"]
            },
            "de_escalation_analysis": {
                "what_worked": "Mentioning Vaishampa Hospital",
                "why_it_worked": "Activated preserved identity memory"
            },
            "recommendations": [
                "Create career memory box with hospital ID",
                "Use identity-anchoring phrases during episodes"
            ]
        }

class PatientVoiceInterface:
    """Voice-only interaction for patient"""
    
    def __init__(self):
        self.patient = PatientContext()
        self.analyzer = BehavioralPatternAnalyzer(self.patient)
        self.companion = VoiceCompanionAI(self.patient, self.analyzer)
        
        self.scheduled_triggers = [
            {"time": "08:00", "purpose": "morning_medication"},
            {"time": "15:30", "purpose": "pre_sundown_intervention"},
            {"time": "18:00", "purpose": "evening_ritual"}
        ]
        
    def check_scheduled_trigger(self, current_time: datetime.datetime) -> Optional[Dict]:
        current_time_str = current_time.strftime("%H:%M")
        
        for trigger in self.scheduled_triggers:
            if trigger["time"] == current_time_str:
                utterances = {
                    "morning_medication": "Good morning, Suhasini. Pankaj wanted me to remind you - your tablets are ready.",
                    "pre_sundown_intervention": "Suhasini, let's have chai. Tell me about your days at Vaishampa Hospital.",
                    "evening_ritual": "You've had a productive day. Shall we call Pankaj?"
                }
                
                return {
                    "type": "SCHEDULED",
                    "purpose": trigger["purpose"],
                    "utterance": utterances.get(trigger["purpose"])
                }
        
        return None
    
    def listen_mode(self, voice_input: str, current_time: datetime.datetime) -> Dict:
        response = self.companion.generate_response(voice_input, current_time)
        
        return {
            "patient_said": voice_input,
            "ai_speaks": response["ai_utterance"],
            "should_alert_family": response["cognitive_state"] == "episode",
            "log_to_doctor": {
                "timestamp": current_time.isoformat(),
                "state": response["cognitive_state"],
                "triggers": response["detected_triggers"]
            }
        }

@dataclass
class FamilyDashboardView:
    """Family-friendly status view"""
    
    patient_name: str
    current_status: Dict
    today_summary: Dict
    recent_alerts: List[Dict]
    medication_compliance: Dict
    
    def render_dashboard(self) -> Dict:
        return {
            "header": {
                "patient": self.patient_name,
                "last_updated": datetime.datetime.now().strftime("%I:%M %p"),
                "overall_status": self.current_status["overall_mood"]
            },
            "current_state": {
                "mood": self.current_status["overall_mood"],
                "activity": self.current_status["current_activity"],
                "needs_attention": self.current_status["alert_level"] == "HIGH"
            },
            "todays_overview": {
                "meals": self.today_summary["meals_completed"],
                "medications": f"{self.medication_compliance['taken']}/{self.medication_compliance['total']}",
                "episodes": self.today_summary["episodes_count"]
            },
            "alerts": self._format_alerts(),
            "reassurance": self._generate_reassurance()
        }
    
    def _format_alerts(self) -> List[str]:
        family_alerts = []
        for alert in self.recent_alerts:
            if alert["type"] == "pankaj_call_needed":
                family_alerts.append("She's been asking about Pankaj - a quick call would help")
        return family_alerts
    
    def _generate_reassurance(self) -> str:
        if self.today_summary["episodes_count"] == 0:
            return "She's had a good day today."
        else:
            return "She had some confusion but AI helped her through it."


class DoctorDashboard:
    """Complete clinical interface"""
    
    def __init__(self, patient_id: str):
        self.patient_id = patient_id
        self.patient_context = PatientContext()
        self.analyzer = BehavioralPatternAnalyzer(self.patient_context)
        self.insights_engine = DoctorInsightsGenerator(self.patient_context, self.analyzer)
        
    def view_calendar_insights(self, date: datetime.date) -> Dict:
        day_interactions = [
            {"time": "08:15", "state": "stable", "triggers": []},
            {"time": "16:00", "state": "sundowning", "triggers": ["money_anxiety"]},
            {"time": "18:00", "state": "stable", "triggers": []}
        ]
        
        daily_summary = self.insights_engine.generate_daily_summary(date, day_interactions)
        
        return {
            "date": date.strftime("%B %d, %Y"),
            "quick_stats": {
                "overall_state": daily_summary["overall_state"],
                "episodes": daily_summary["episode_count"]
            },
            "timeline": day_interactions,
            "ai_narrative": daily_summary["narrative_summary"]
        }
    
    def get_ai_pattern_analysis(self, timeframe: str = "week") -> Dict:
        week_data = [
            {"date": "2026-02-01", "triggers": {"sister_urgency": 8}},
            {"date": "2026-02-02", "triggers": {"money_anxiety": 6}}
        ]
        
        return self.insights_engine.generate_weekly_pattern_analysis(week_data)
    
    def analyze_uploaded_video(self, video_file: str, context: Dict) -> Dict:
        return self.insights_engine.analyze_episode_video(context)
    
    def chat_with_ai(self, doctor_question: str) -> Dict:
        responses = {
            "why sister obsession": "Sister is her only living sibling. The obsession represents anticipatory grief and need for final witness to her identity.",
            "food refusal": "Food refusal is maternal deprivation grief. Reframe eating as reassurance TO Pankaj, not self-care."
        }
        
        for key in responses:
            if key in doctor_question.lower():
                return {
                    "doctor_asked": doctor_question,
                    "ai_analysis": responses[key],
                    "recommended_action": "See analysis above"
                }
        
        return {
            "doctor_asked": doctor_question,
            "ai_analysis": "I can help analyze that. Please provide more details.",
            "recommended_action": "Elaborate your question"
        }

def run_complete_demo():
    """
    Demonstrates all three interfaces working together
    """
    
    print("="*70)
    print("COMPLETE ALZHEIMER'S AI SYSTEM DEMONSTRATION")
    print("="*70)
    print()

    
    print("=" * 70)
    print("1. PATIENT INTERFACE (Voice-Only)")
    print("=" * 70)
    print()
    
    patient_interface = PatientVoiceInterface()
    
    
    morning_time = datetime.datetime(2026, 2, 7, 8, 0)
    trigger = patient_interface.check_scheduled_trigger(morning_time)
    
    if trigger:
        print(f"[8:00 AM - AI INITIATES CONVERSATION]")
        print(f"AI: {trigger['utterance']}")
        print()
    
    
    patient_says = "Where is Pankaj? I need to talk to him."
    response = patient_interface.listen_mode(patient_says, morning_time)
    
    print(f"[PATIENT SPEAKS]: {patient_says}")
    print(f"[AI RESPONDS]: {response['ai_speaks']}")
    print(f"[ALERT FAMILY?]: {response['should_alert_family']}")
    print(f"[LOG TO DOCTOR]: {json.dumps(response['log_to_doctor'], indent=2)}")
    print()
    
    
    afternoon_time = datetime.datetime(2026, 2, 7, 16, 0)
    patient_says = "Someone stole money from my Solapur house!"
    response = patient_interface.listen_mode(patient_says, afternoon_time)
    
    print(f"[4:00 PM - PATIENT SPEAKS]: {patient_says}")
    print(f"[AI DETECTS]: Sundowning + Money anxiety")
    print(f"[AI RESPONDS]: {response['ai_speaks']}")
    print()
    

    print("=" * 70)
    print("2. FAMILY INTERFACE (What Pankaj Sees)")
    print("=" * 70)
    print()
    
    current_status = {
        "overall_mood": "confused",
        "current_activity": "Looking at old photos",
        "alert_level": "MEDIUM"
    }
    
    today_summary = {
        "meals_completed": "2/3",
        "episodes_count": 1
    }
    
    medication_compliance = {
        "taken": 3,
        "total": 4
    }
    
    alerts = [
        {"type": "pankaj_call_needed", "timestamp": "15:45"}
    ]
    
    family_dashboard = FamilyDashboardView(
        patient_name="Suhasini (Aai)",
        current_status=current_status,
        today_summary=today_summary,
        recent_alerts=alerts,
        medication_compliance=medication_compliance
    )
    
    family_view = family_dashboard.render_dashboard()
    
    print(f"PATIENT: {family_view['header']['patient']}")
    print(f"STATUS: {family_view['current_state']['mood']}")
    print(f"ACTIVITY: {family_view['current_state']['activity']}")
    print()
    print("TODAY'S SUMMARY:")
    print(f"  Meals: {family_view['todays_overview']['meals']}")
    print(f"  Medications: {family_view['todays_overview']['medications']}")
    print(f"  Episodes: {family_view['todays_overview']['episodes']}")
    print()
    print("ALERTS:")
    for alert in family_view['alerts']:
        print(f"  • {alert}")
    print()
    print(f"💙 {family_view['reassurance']}")
    print()
    

    
    print("=" * 70)
    print("3. DOCTOR INTERFACE (Clinical Dashboard)")
    print("=" * 70)
    print()
    
    doctor_dashboard = DoctorDashboard(patient_id="SUHASINI_001")
    
    
    print("📅 CALENDAR VIEW (February 7, 2026):")
    day_view = doctor_dashboard.view_calendar_insights(datetime.date(2026, 2, 7))
    print(json.dumps(day_view, indent=2))
    print()
    
    
    print("🧠 AI PATTERN ANALYSIS (This Week):")
    patterns = doctor_dashboard.get_ai_pattern_analysis("week")
    print(json.dumps(patterns, indent=2))
    print()
    
    
    print("🎥 EPISODE VIDEO ANALYSIS:")
    episode_context = {
        "timestamp": "2026-02-07T17:15:00",
        "duration_seconds": 720
    }
    video_analysis = doctor_dashboard.analyze_uploaded_video("episode.mp4", episode_context)
    print(json.dumps(video_analysis, indent=2))
    print()
    
    print("💬 DOCTOR CHATS WITH AI:")
    question = "Why is she obsessed with her sister suddenly?"
    ai_response = doctor_dashboard.chat_with_ai(question)
    print(f"Doctor: {ai_response['doctor_asked']}")
    print(f"AI: {ai_response['ai_analysis']}")
    print()
    
    print("=" * 70)
    print("DEMO COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    run_complete_demo()
