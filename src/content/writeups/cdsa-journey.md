---
title: "From Clearing HTB CDSA to Teaching Blue Team Security: A Journey from Learning to Leading"
tag: "Blue team"
excerpt: "Six months of Windows event logs, one 2:30 AM exam submission, and a workshop where I taught what once confused me."
coverColor: "#1D7573"
order: 1
---
# From Clearing HTB CDSA to Teaching Blue Team Security: A Journey from Learning to Leading

There is something particularly rewarding about returning to a subject
you once struggled with, except this time, you are the one standing in
front of the room explaining it to others.

When I started preparing for the **Hack The Box Certified Defensive
Security Analyst (CDSA)** certification, I wasn't entirely sure whether
blue-team security was the direction I wanted to pursue professionally.
I wanted to explore it, understand what working on the defensive side of
cybersecurity actually involved, and see whether it was something I
could see myself doing in the long run.

What I didn't anticipate was how much the experience would change my
understanding of cybersecurity, how challenging the learning process
would become, or that a few months after earning the certification, I
would be invited to deliver a blue-team workshop at FAST.

This is an account of that journey, from exploring defensive security
to earning my first hands-on blue team certification, and
eventually teaching the concepts I had worked so hard to understand.

## 1. Why I Chose CDSA

Coming from an academic background in cybersecurity, I had already been
exposed to several areas of the field. My coursework included
networking, Linux, Windows, security fundamentals, digital forensics,
and network traffic analysis. I had worked with tools such as Wireshark
and Volatility in university labs and had some exposure to cybersecurity
through my earlier involvement with GRC.

However, academic exposure and practical proficiency are two very
different things.

I understood the concepts, knew what different tools were designed to
accomplish, and had completed coursework involving them. But I hadn't
worked with professional security monitoring platforms or developed the
investigative workflow required to handle security incidents.

I wanted to bridge that gap.

My decision to pursue CDSA was also influenced by an interest in
exploring the defensive side of cybersecurity. Rather than committing to
a particular career path without understanding what it involved, I
wanted a structured way to experience blue-team operations and determine
whether I enjoyed the work.

I considered different learning platforms and certifications, including
Security Blue Team's BTL1. While BTL1 has considerable recognition, I
ultimately gravitated towards Hack The Box.

The deciding factor was its practical learning environment. HTB offered
virtual environments, hands-on exercises, and opportunities to work
through technical scenarios rather than relying exclusively on
theoretical material.

I wanted to understand the technicalities behind security operations,
not just memorize what a SOC analyst was supposed to do.

That was how my CDSA journey began.

## 2. The Preparation Phase: A Lesson in Learning What Actually Matters

One of my earliest mistakes was spending too much time preparing for the
preparation.

I initially approached CDSA with the idea that I needed to strengthen
every prerequisite before moving forward. I spent approximately four
months working through foundational material and trying to ensure I was
adequately prepared.

Although revisiting fundamentals was useful, I eventually realized that
I had spent far more time preparing than I needed to.

The problem wasn't that foundational knowledge was unimportant. It was
that I was trying to achieve a level of preparedness that could only
realistically come through actually working with the material.

I already had some understanding of networking, operating systems, and
security fundamentals. What I lacked was the ability to bring those
concepts together in an investigative environment.

That distinction became increasingly apparent once I started working
through the actual material.

My overall journey extended to approximately six months, and I quickly
learned that progressing through a technical certification isn't
necessarily about how much you already know. It is about how effectively
you can apply that knowledge when faced with unfamiliar situations.

## 3. Windows: The Part That Completely Changed My Perspective

If there was one area that challenged my understanding of defensive
security more than anything else, it was Windows.

I had studied Windows operating systems before. I understood the basics
of system administration, user accounts, processes, and operating system
architecture.

But investigating Windows from a security perspective was an entirely
different experience.

Understanding how Windows operates is one thing. Understanding what its
internal activity looks like through logs, how authentication events are
recorded, how processes interact, and how an attack manifests across
different artifacts is another.

**Windows Event Logs became one of the most important parts of my
learning journey.**

I had to move beyond simply recognizing event logs and start
understanding their investigative significance.

Some of the concepts that became particularly important included:

-   Windows Security Event Logs and their role in monitoring
    authentication and account activity.
-   Event IDs and what different events reveal about system behavior.
-   Authentication events, including successful and failed logons.
-   Account creation, modification, and privilege-related activity.
-   Process execution and the significance of process creation
    telemetry.
-   Sysmon and its ability to provide more detailed endpoint visibility.
-   Correlating events across different sources to reconstruct activity.

For example, a failed authentication event in isolation might not
indicate anything particularly concerning. However, when correlated with
subsequent successful authentication, unusual account activity, and
suspicious process execution, it can become part of a much larger
investigative picture.

I also had to understand the relationship between Windows security
events, Sysmon telemetry, and the broader context of an investigation.

This was where my understanding of defensive security began to change.

Instead of asking what an individual event meant, I started asking what
had happened before it, what followed it, and how the available evidence
connected.

Active Directory added another layer to this learning process.
Understanding domain environments, authentication, user accounts,
permissions, and the relationship between different components of an
enterprise Windows environment was essential to recognizing suspicious
activity.

It was no longer enough to know that an event had occurred. I needed to
understand why it mattered within the environment being investigated.

Windows genuinely shook my confidence at certain points, but it also
became one of the most valuable parts of the entire certification.

## 4. Moving Beyond Theory: Understanding the Blue Team Workflow

One of the biggest takeaways from CDSA was realizing that defensive
security is not simply about monitoring alerts.

A SOC analyst needs to understand the environment, recognize suspicious
behavior, investigate available evidence, establish context, and
determine whether an activity represents a genuine security incident.

The course helped me understand several interconnected areas of
defensive security.

### Security Information and Event Management (SIEM)

SIEM was one of the areas I particularly wanted to explore because it
sits at the center of many SOC operations.

I learned about the importance of centralized log collection,
normalization, searching, correlation, and alert investigation.

Working with SIEM concepts helped me understand how security teams bring
together telemetry from different sources to establish visibility across
an environment.

More importantly, I began understanding that an alert is only the
starting point of an investigation.

An analyst needs to determine:

-   What triggered the alert?
-   Which host, user, or process is involved?
-   Is the activity expected or suspicious?
-   What other events are associated with it?
-   Does the evidence indicate malicious activity?
-   What should be investigated next?

This is where log analysis and correlation become particularly
important.

### Network Traffic Analysis

My previous academic exposure to networking and Wireshark gave me a
foundation, but applying network analysis to security investigations
introduced a different perspective.

I became more interested in understanding communication patterns,
identifying unusual connections, examining packet-level information, and
recognizing indicators of potentially malicious network activity.

Tools and technologies such as Wireshark, Suricata, and Snort helped
illustrate different aspects of network visibility and intrusion
detection.

Understanding the difference between network traffic analysis and
network intrusion detection was particularly important.

A packet capture can provide detailed information about individual
communications, whereas an IDS can help identify patterns associated
with known or suspicious activity.

Both contribute valuable evidence during an investigation.

### Threat Hunting and Detection

Another important realization was that effective security operations
cannot rely entirely on predefined alerts.

Threat hunting involves proactively examining available telemetry to
identify suspicious activity that might not have triggered an existing
detection rule.

This requires understanding attacker behavior, knowing what telemetry is
available, and developing hypotheses that can be investigated through
logs and other evidence.

I began appreciating the relationship between detection engineering and
threat hunting: one focuses on developing mechanisms to identify
suspicious activity, while the other actively searches for threats
within an environment.

### Digital Forensics and Incident Response

My university background had already introduced me to digital forensics,
including concepts associated with memory analysis and forensic
investigation.

However, CDSA helped me appreciate how forensic techniques fit into a
wider incident response process.

Investigations are not limited to collecting artifacts. They involve
understanding what happened, establishing a timeline, identifying
relevant evidence, and documenting findings in a way that supports
incident response decisions.

I also explored the importance of endpoint artifacts, memory analysis,
and malware investigation.

Tools such as Volatility were particularly relevant to understanding
memory forensics, while x64dbg introduced another dimension to examining
executable behavior.

What stood out to me was how these different investigative disciplines
complement one another.

A suspicious process might initially be identified through endpoint
telemetry. Network analysis might reveal its external communications,
while forensic examination could provide additional context about its
execution and behavior.

The real value lies in connecting the evidence.

## 5. The Part Nobody Talks About: Falling Behind

Not everything went according to plan.

Despite spending months preparing, I eventually found myself behind my
intended timeline.

Personal circumstances affected my consistency, and I reached a point
where I had to accelerate my progress considerably.

Some of the areas I had struggled with earlier (particularly Windows,
Active Directory, and event logs) were now areas I needed to revisit
and understand much more quickly.

There were frustrating labs, unfamiliar concepts, and moments when I
felt that I was spending far too much time trying to understand a single
problem.

The challenge wasn't necessarily the complexity of an individual topic.
It was understanding how multiple concepts interacted in a real
investigation.

I also had to become more intentional about how I spent my time.

Instead of endlessly revisiting prerequisites, I needed to work through
the material, identify gaps in my understanding, and address them as
they appeared.

One thing that helped me maintain consistency was my Hack The Box
streak, which eventually reached eight consecutive weeks.

It wasn't always about completing enormous amounts of material every
day. It was about maintaining the habit of showing up, working through
problems, and continuing even when progress felt slow.

Looking back, one of the most important lessons from this phase was that
technical learning is rarely linear.

Sometimes you understand a concept immediately. Sometimes you revisit it
several times before it makes sense. And sometimes the thing you thought
you understood becomes considerably more complicated when you encounter
it in a practical environment.

That is part of the process.

## 6. The Practical Examination: Bringing Everything Together

The practical examination was the point where everything I had studied
needed to come together.

Unlike a conventional examination that primarily evaluates theoretical
understanding, a practical security assessment requires you to work with
evidence, investigate activity, and reach conclusions based on what you
can establish.

I had a limited examination window, and by this point, I was already
conscious of how much time I had spent preparing.

The assessment required me to approach security investigations
systematically rather than treating each artifact as an isolated piece
of information.

This meant thinking about the investigative process:

1.  **Establishing context:** Understanding the environment and the
    available evidence.
2.  **Identifying suspicious activity:** Recognizing events and
    behaviors that warranted further investigation.
3.  **Examining evidence:** Working through relevant logs, artifacts,
    and telemetry.
4.  **Correlating findings:** Connecting activity across different
    sources to establish a coherent picture.
5.  **Reconstructing events:** Understanding the sequence of activity
    and identifying relevant timelines.
6.  **Documenting conclusions:** Presenting findings clearly and
    supporting them with investigative evidence.

One particularly important lesson was the significance of documentation.

An investigation is not complete simply because an analyst believes they
have identified malicious activity.

The findings must be communicated clearly, with sufficient supporting
evidence to explain what happened and why the conclusion was reached.

I spent considerable time working through the assessment and eventually
submitted my examination at approximately 2:30 AM.

It was one of those moments where months of preparation, frustration,
uncertainty, and determination all came together.

On September 22, 2026, I received the result.

**I had passed the HTB Certified Defensive Security Analyst
certification.**

My first hands-on blue team certification.

And one of the most rewarding parts was knowing how much work had gone
into reaching that point.

## 7. From Learning to Teaching: Taking the Experience Back to the Classroom

Perhaps the most unexpected development after earning CDSA was getting
the opportunity to share what I had learned with others.

I was invited to deliver a 2.5-hour blue-team workshop at FAST
for students from different semesters.

The idea was particularly meaningful because I wasn't approaching the
subject as someone who had simply studied blue-team concepts
academically. I had recently gone through the process of learning them
in a practical environment, struggling with unfamiliar concepts,
investigating security activity, and understanding how different
components fit together.

I wanted the workshop to reflect that experience.

Rather than making it another presentation filled with definitions and
theoretical explanations, I wanted students to understand how defensive
security actually works.

We focused on the SOC workflow, security monitoring, SIEM concepts,
Windows Event Logs, Active Directory, and digital forensics and incident
response.

I also wanted to demonstrate how an investigation develops.

For example, rather than simply explaining what a Windows Event ID
represents, the objective was to help students understand how an analyst
could use relevant events to investigate suspicious authentication
activity.

Similarly, when discussing incident response, I wanted to emphasize the
importance of establishing timelines, correlating evidence, and
understanding the relationship between different investigative
artifacts.

The workshop also incorporated practical investigative thinking rather
than limiting the discussion to slides.

There was something particularly interesting about revisiting concepts
that had once been difficult for me and finding ways to explain them in
simpler, more understandable terms.

Teaching also exposed another dimension of technical understanding.

It is one thing to follow a process when you are working through a lab.
It is another to explain why that process exists, what each step
accomplishes, and what could happen if an analyst overlooks something
important.

The experience made me appreciate just how much deeper your
understanding becomes when you have to communicate it to someone else.

In many ways, the workshop brought my CDSA journey full circle.

I had initially started the certification because I wanted to explore
blue-team security. I completed it, discovered how much I enjoyed the
investigative side of the field, and eventually found myself introducing
those same concepts to students who were just beginning their own
journeys.

## 8. What CDSA Actually Changed for Me

Looking back, the biggest outcome of CDSA wasn't simply the
certification itself.

It was the shift in how I approached cybersecurity.

Before this experience, I had a reasonable understanding of different
cybersecurity domains. I knew about networking, operating systems,
digital forensics, and security fundamentals.

But I had not fully appreciated how these areas connect during an actual
security investigation.

CDSA helped me develop a more investigative approach to technical
problems.

I became more conscious of the importance of:

-   Understanding the environment before interpreting suspicious
    activity.
-   Recognizing the significance of Windows Event Logs and endpoint
    telemetry.
-   Correlating evidence rather than relying on isolated events.
-   Understanding attacker behavior and the traces it leaves behind.
-   Using network and endpoint evidence together.
-   Approaching investigations methodically.
-   Documenting findings and communicating conclusions effectively.

It also helped me understand that being a good security analyst is not
about knowing every tool or memorizing every event ID.

Tools are important, but the ability to interpret the information they
provide is what makes an investigation meaningful.

A SIEM can generate an alert, an IDS can identify suspicious network
activity, and forensic tools can extract artifacts. But it is the
analyst who must understand how the evidence connects and what it means.

That distinction is something I carry forward from this experience.

## 9. What Comes Next?

CDSA was initially an opportunity to explore a different direction
within cybersecurity. It eventually became a significant part of my
professional development and gave me a much stronger appreciation for
defensive security.

It also reinforced something I had started realizing throughout my
degree: cybersecurity is too broad to understand through one discipline
alone.

The defensive side requires an understanding of systems, networks,
attacker behavior, digital evidence, and the operational processes that
bring everything together.

I'm glad I chose a learning path that challenged my existing
understanding instead of simply reinforcing what I already knew.

And perhaps the most rewarding part has been being able to take that
experience beyond my own learning and share it with others.

From spending months trying to understand Windows Event Logs to standing
in front of students and explaining how analysts use them during
investigations, the journey has certainly come a long way.

**September 22, 2026, will remain an important milestone for me, not
just because I cleared my first hands-on blue team
certification, but because it marked the beginning of a much more
practical relationship with defensive security.**

Sometimes, the best way to understand how far you've come is to find
yourself teaching something that once seemed impossibly difficult to
learn.
